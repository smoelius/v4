/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
export type Permissions = {
  mask: number
}

/**
 * @category userTypes
 * @category generated
 */
export const permissionsBeet = new beet.BeetArgsStruct<Permissions>(
  [['mask', beet.u8]],
  'Permissions'
)