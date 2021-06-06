import { useMutation, useQueryClient } from 'react-query'

const useLogout = () => {
  const queryClient = useQueryClient()

  const logOut = () => fetch('/api/logout')

  const mutation = useMutation(logOut, {
    onMutate: async () => {
      // Stop the queries that may affect this operation
      await queryClient.cancelQueries('currentUser')

      // Get a snapshot of current data
      const snapshotOfAccount = queryClient.getQueryData('currentUser')

      // Modify cache to reflect this optimistic update
      queryClient.setQueryData('currentUser', null)

      // Return a snapshot so we can rollback in case of failure
      return {
        snapshotOfAccount,
      }
    },
    onError: (error, undefined, { snapshotOfAccount }) => {
      // Rollback the changes using the snapshot
      queryClient.setQueryData('currentUser', snapshotOfAccount)
    },

    onSuccess() {
      // Refetch or invalidate related queries
      queryClient.invalidateQueries('currentUser')
    },
  })

  return mutation
}

export default useLogout
