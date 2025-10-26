import { describe, it, expect } from 'vitest'
import { storeApi } from '../../services/api'

// Test API functions
describe('storeApi', () => {
  describe('fetchStoreItemsPaginated', () => {
    it('should have the correct function signature', () => {
      expect(typeof storeApi.fetchStoreItemsPaginated).toBe('function')
    })

    it('should accept optional page and limit parameters', () => {
      // This test just ensures the function exists and can be called
      expect(() => storeApi.fetchStoreItemsPaginated()).not.toThrow()
      expect(() => storeApi.fetchStoreItemsPaginated(1)).not.toThrow()
      expect(() => storeApi.fetchStoreItemsPaginated(1, 20)).not.toThrow()
    })
  })
})
