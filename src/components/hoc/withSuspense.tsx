import React, {Suspense} from 'react'

export const withSuspense = (Component: any) => {
    return (props: any) => {
        return <Suspense fallback={() => <div>Loading...</div>}>
            <Component {...props}/>
        </Suspense>
    }
}