const React = require('react')
const Default = require('./layouts/Default')

// Default is our html boilerplate wrapper imported from the layouts directory
// Everything between <Default> and </Default> in the function below shows up as "html.children" in that component
// If we look at the nesting below, we can see that those elements /are/ children of Default. :)

// This function renders our list of breads
// An object with the key "breadsList" is passed in as an argument of res.render() in our breads_controller
// We use destructuring to pull out that key on the line below, then we can access breadsList within the function.
function Index ({breadsList}) {
    return (
        <Default>
            <h2>This is a list of breads.</h2>
            <ul>
                {breadsList.map((bread, index) => {
                    return (
                        <li>
                            <a className="bread" href={`/breads/${index}`}>{bread.name}</a>
                        </li>
                        )
                    })
                }
            </ul>
            <p>Here are some words.</p>
        </Default>
    )
}

module.exports = Index