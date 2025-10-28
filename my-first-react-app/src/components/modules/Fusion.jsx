import Button from './Button'
import FirstComponent from './FirstComponent'
import {WhatIsReact, WhatIsJx} from './WhatIs'

const Fusion = () => {
    return (
        <div className="app-wrapper d-flex flex-column min-vh-100">
			<FirstComponent/>
			<WhatIsReact/>
			<WhatIsJx/>
            <Button/>
        </div>
    )
}

export default Fusion;