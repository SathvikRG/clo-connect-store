import { describe, it, expect } from 'vitest'
import { storeApi } from '../../services/api'

// Skip API tests for now - they test external dependencies
describe.skip('storeApi', () => {
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
