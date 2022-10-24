import React from 'react'
import styled from 'styled-components'

type ProgressBarProps = {
    current: number
    total: number
}

const ProgressBarContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ProgressBar = ({ current, total }: ProgressBarProps) => {
    return (
        <ProgressBarContainer>
            {`${current} out of ${total}`}
        </ProgressBarContainer>
    )
}

export default ProgressBar
