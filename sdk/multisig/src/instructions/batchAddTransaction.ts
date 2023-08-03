import {
  AddressLookupTableAccount,
  PublicKey,
  TransactionMessage,
} from "@solana/web3.js";
import { createBatchAddTransactionInstruction } from "../generated";
import {
  getBatchTransactionPda,
  getProposalPda,
  getTransactionPda,
  getVaultPda,
} from "../pda";
import { transactionMessageToMultisigTransactionMessageBytes } from "../utils";

export function batchAddTransaction({
  vaultIndex,
  multisigPda,
  member,
  batchIndex,
  transactionIndex,
  ephemeralSigners,
  transactionMessage,
  addressLookupTableAccounts,
}: {
  vaultIndex: number;
  multisigPda: PublicKey;
  member: PublicKey;
  batchIndex: bigint;
  transactionIndex: number;
  /** Number of additional signing PDAs required by the transaction. */
  ephemeralSigners: number;
  /** Transaction message to wrap into a batch transaction. */
  transactionMessage: TransactionMessage;
  /** `AddressLookupTableAccount`s referenced in `transaction_message`. */
  addressLookupTableAccounts?: AddressLookupTableAccount[];
}) {
  const [proposalPda] = getProposalPda({
    multisigPda,
    transactionIndex: batchIndex,
  });
  const [batchPda] = getTransactionPda({
    multisigPda,
    index: batchIndex,
  });
  const [batchTransactionPda] = getBatchTransactionPda({
    multisigPda,
    batchIndex,
    transactionIndex,
  });
  const [vaultPda] = getVaultPda({
    multisigPda,
    index: vaultIndex,
  });

  const transactionMessageBytes =
    transactionMessageToMultisigTransactionMessageBytes({
      message: transactionMessage,
      addressLookupTableAccounts,
      vaultPda,
    });

  return createBatchAddTransactionInstruction(
    {
      multisig: multisigPda,
      member,
      proposal: proposalPda,
      batch: batchPda,
      transaction: batchTransactionPda,
    },
    {
      args: {
        ephemeralSigners,
        transactionMessage: transactionMessageBytes,
      },
    }
  );
}
