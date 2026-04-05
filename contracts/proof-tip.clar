;; ProofTip - Decentralized Micro-Tipping Protocol on Stacks
;;
;; ProofTip enables verifiable, on-chain micro-tipping using STX.
;; Each tip is recorded as a "proof" of support.

;; ---------------------------------------------------------
;; Constants
;; ---------------------------------------------------------

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-invalid-amount (err u101))
(define-constant err-insufficient-balance (err u102))
(define-constant err-transfer-failed (err u103))
(define-constant err-not-found (err u104))
(define-constant err-insufficient-fees (err u105))

;; ---------------------------------------------------------
;; Fee Configuration
;; ---------------------------------------------------------

(define-constant fee-basis-points u50) ;; 0.5%
(define-constant basis-points-divisor u10000)

;; ---------------------------------------------------------
;; Global State
;; ---------------------------------------------------------

(define-data-var total-proofs uint u0)
(define-data-var total-volume uint u0)
(define-data-var platform-fees uint u0)

;; ---------------------------------------------------------
;; Data Maps
;; ---------------------------------------------------------

(define-map proof-ledger
    { proof-id: uint }
    {
        sender: principal,
        recipient: principal,
        amount: uint,
        message: (string-utf8 280),
        tip-height: uint
    }
)

(define-map user-tip-count principal uint)
(define-map user-received-count principal uint)
(define-map user-total-sent principal uint)
(define-map user-total-received principal uint)

;; ---------------------------------------------------------
;; Private Functions
;; ---------------------------------------------------------

(define-private (calculate-fee (amount uint))
    (/ (* amount fee-basis-points) basis-points-divisor)
)

;; ---------------------------------------------------------
;; Public Functions
;; ---------------------------------------------------------

;; submit-proof-tip
(define-public (submit-proof-tip (recipient principal) (amount uint) (message (string-utf8 280)))
    (let
        (
            (proof-id (var-get total-proofs))
            (fee (calculate-fee amount))
            (is-owner (is-eq tx-sender contract-owner))
            (net-amount (if is-owner amount (- amount fee)))

            (sender-sent (default-to u0 (map-get? user-total-sent tx-sender)))
            (recipient-received (default-to u0 (map-get? user-total-received recipient)))
            (sender-count (default-to u0 (map-get? user-tip-count tx-sender)))
            (recipient-count (default-to u0 (map-get? user-received-count recipient)))

        ;; Validation
        (asserts! (> amount u0) err-invalid-amount)
        (asserts! (not (is-eq tx-sender recipient)) err-invalid-amount)
        (asserts! (<= (len message) u280) err-invalid-amount)

        ;; Transfers
        (try! (stx-transfer? net-amount tx-sender recipient))

        (if is-owner
            true
            (try! (stx-transfer? fee tx-sender contract-owner))
        )

        ;; Record proof
        (map-set proof-ledger
            { proof-id: proof-id }
            {
                sender: tx-sender,
                recipient: recipient,
                amount: amount,
                message: message,
                tip-height: stacks-block-height
            }
        )

        ;; Update user stats
        (map-set user-total-sent tx-sender (+ sender-sent amount))
        (map-set user-total-received recipient (+ recipient-received amount))
        (map-set user-tip-count tx-sender (+ sender-count u1))
        (map-set user-received-count recipient (+ recipient-count u1))

        ;; Update global stats
        (var-set total-proofs (+ proof-id u1))
        (var-set total-volume (+ (var-get total-volume) amount))
        (var-set platform-fees (+ (var-get platform-fees) fee))

        ;; Emit event
        (print {
            event: "proof-tip",
            proof-id: proof-id,
            sender: tx-sender,
            recipient: recipient,
            amount: amount,
            fee: fee,
            message: message
        })

        (ok proof-id)
    )
)

;; Withdraw accumulated fees
(define-public (withdraw-fees (amount uint))
    (let
        (
            (current-fees (var-get platform-fees))
        )
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (asserts! (>= current-fees amount) err-insufficient-fees)

        (try! (stx-transfer? amount tx-sender contract-owner))
        (var-set platform-fees (- current-fees amount))

        (ok true)
    )
)

;; ---------------------------------------------------------
;; Read-Only Functions
;; ---------------------------------------------------------

;; Get a proof by ID
(define-read-only (get-proof (proof-id uint))