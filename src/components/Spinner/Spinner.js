import React from 'react';


export default class Spinner extends React.PureComponent {
    render() {
        return (
            <>
                <div className="text-center">
                    <div className="spinner-border m-5" role="status">
                    </div>
                </div>
            </>
        )
    }
}