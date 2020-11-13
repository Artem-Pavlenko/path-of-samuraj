import React, {useEffect, useState} from "react";

type count = {
    totalUsersCount: number
}

const TotalUsersCount = ({totalUsersCount}: count) => {

    const [count, setCount] = useState(0)

    useEffect(() => {
        if (totalUsersCount) {
            const interval = setInterval(() => {
                count > totalUsersCount && clearInterval(interval)
                count < totalUsersCount && setCount(() => count + 112)
            }, 10)
            count > totalUsersCount  && setCount(totalUsersCount)
            return () => clearInterval(interval)
        }
    }, [count, totalUsersCount])


    return (
        <div>
            {totalUsersCount !== 0 && <span>Total users count: {count}</span>}
        </div>
    )
}

export default TotalUsersCount