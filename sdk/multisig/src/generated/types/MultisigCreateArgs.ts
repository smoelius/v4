/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beet from '@metaplex-foundation/beet'
import * as beetSolana from '@metaplex-foundation/beet-solana'
import { Member, memberBeet } from './Member'
export type MultisigCreateArgs = {
  configAuthority: web3.PublicKey
  threshold: number
  members: Member[]
  memo: beet.COption<string>
}

/**
 * @category userTypes
 * @category generated
 */
export const multisigCreateArgsBeet =
  new beet.FixableBeetArgsStruct<MultisigCreateArgs>(
    [
      ['configAuthority', beetSolana.publicKey],
      ['threshold', beet.u16],
      ['members', beet.array(memberBeet)],
      ['memo', beet.coption(beet.utf8String)],
    ],
    'MultisigCreateArgs'
  )