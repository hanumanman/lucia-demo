/**
 * Constant-time equality comparison of two byte arrays.
 *
 * This function takes two Uint8Array objects as input and returns a boolean
 * value indicating whether the two arrays are equal or not. The function
 * performs a constant-time comparison, meaning that it will not leak any
 * information about the input data through timing or other side channels.
 *
 * @param a The first byte array to compare.
 * @param b The second byte array to compare.
 * @returns A boolean value indicating whether the two arrays are equal or not.
 */
export function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) {
    return false
  }
  let c = 0
  for (let i = 0; i < a.byteLength; i++) {
    // XOR the corresponding bytes of the two arrays
    c |= a[i] ^ b[i]
  }
  return c === 0
}
