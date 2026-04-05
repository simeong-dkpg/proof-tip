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