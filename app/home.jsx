'use client'

import ReactFullpage from "@fullpage/react-fullpage"

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    /*
    * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
    */
};

export default function HomePage({ venues }) {
    const fullpages = [
        {
            text: "Section 1"
        },
        {
            text: "Section 2"
        },
        {
            text: 'Section 3',
        }
    ]

    return (
        <div>
            <ReactFullpage
                navigation
                // pluginWrapper={pluginWrapper}
                scrollHorizontally = {true}
                render={comp =>
                    console.log("render prop change") || (
                        <ReactFullpage.Wrapper>
                            {fullpages.map(({ text }) => (
                                <div key={text} className="section">
                                    <h1>{text}</h1>
                                </div>
                            ))}
                        </ReactFullpage.Wrapper>
                    )
                }
            />
            {venues.map((post) => (
                <div key={post.id}>{post.label}</div>
            ))}
        </div>
    )
}