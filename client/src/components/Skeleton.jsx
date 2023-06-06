import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = props => (
    <ContentLoader
        viewBox="0 0 400 200"
        width={400}
        height={200}
        title="Loading news..."
        {...props}
    >
        <rect x="10" y="9.93" rx="5" ry="5" width="300" height="180" />


    </ContentLoader>
)

Skeleton.metadata = {
    name: 'Arthur Falcão',
    github: 'arthurfalcao',
    description: 'News List',
    filename: 'News',
}

export default Skeleton;