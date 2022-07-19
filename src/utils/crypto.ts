import { AES, mode, pad, enc } from 'crypto-js'

const AES_KEYS = 'xxxxxxxxxxxxxxxxxxxxxxxx'

/**
 * ASE加密
 * @param {string} plaintext 需要加密的明文
 */
export function aesEncrypt(plaintext: string) {
  const keys = enc.Utf8.parse(AES_KEYS)
  const encrypted = AES.encrypt(plaintext, keys, {
    mode: mode.ECB,
    padding: pad.Pkcs7
  })
  const result = enc.Hex.parse(encrypted.ciphertext.toString())
  return result.toString()
}
/**
 * ASE解密
 * @param {string} ciphertext 需要解密的密文
 */
export function aesDecrypt(ciphertext: string) {
  if (!ciphertext) return ''
  const keys = enc.Utf8.parse(AES_KEYS)
  const hexCiphertext = enc.Hex.parse(ciphertext)
  const formatCiphertext = enc.Base64.stringify(hexCiphertext)
  const result = AES.decrypt(formatCiphertext, keys, {
    mode: mode.ECB,
    padding: pad.Pkcs7
  })
  return result.toString(enc.Utf8)
}
