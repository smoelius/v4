import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import * as instructions from "../instructions/index.js";

/**
 * Returns unsigned `VersionedTransaction` that needs to be
 * signed by `member` and `feePayer` before sending it.
 */
export function proposalActivate({
  blockhash,
  feePayer,
  multisigPda,
  transactionIndex,
  member,
}: {
  blockhash: string;
  feePayer: PublicKey;
  multisigPda: PublicKey;
  transactionIndex: bigint;
  member: PublicKey;
}): VersionedTransaction {
  const message = new TransactionMessage({
    payerKey: feePayer,
    recentBlockhash: blockhash,
    instructions: [
      instructions.proposalActivate({
        member,
        multisigPda,
        transactionIndex,
      }),
    ],
  }).compileToV0Message();

  return new VersionedTransaction(message);
}
