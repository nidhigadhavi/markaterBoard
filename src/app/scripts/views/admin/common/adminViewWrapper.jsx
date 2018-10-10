import React from "react";

class adminViewWrapper extends React.Component {
    render() {
        return (
            <div>
                {this.props.viewContents}
            </div>
        );
    }
}


export default adminViewWrapper;
