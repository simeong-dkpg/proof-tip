;; ProofTip - Decentralized Micro-Tipping Protocol on Stacks
;;
;; ProofTip enables verifiable, on-chain micro-tipping using STX.
;; Each tip is recorded as a "proof" of support.

;; ---------------------------------------------------------
;; Constants
;; ---------------------------------------------------------

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))