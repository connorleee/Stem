import React, { Component } from "react";
import tumblr from "tumblr.js";
import API from "../../utils/API";
import Cookies from "js-cookie";

// console.log(API_KEY);


class SingleContact extends Component {
    constructor(props) {
        super(props);

        this.state = { // This data is perhaps with props
            userid: 0,
            name: "davis112"

        };
    }
    handleSwap = (event) => {
        this.props.swapView("All Contacts", null, null);
    }
    
    queryTumblr = () => {
        let userBlogName = this.state.name;
        const API_KEY = process.env.REACT_APP_API_KEY;
        var client = tumblr.createClient({ consumer_key: API_KEY });
        //this is querying the tumblr blog method, pulls back an object of basic info
        client.blogInfo(`${userBlogName}.tumblr.com`, function (err, data) {
            console.log(data);
        })
    }

    componentDidMount() {
        console.log(`User id: ${Cookies.get("google_id")}`)
        console.log(`Contact id: ${this.props.payload.id}`)
        API.getUser(Cookies.get("google_id")).then(user => { /* TODO: get this working */
            let contacts = user.contacts

            console.log(`contacts: ${contacts}`)
        })

        this.queryTumblr();
    }

    render() {
        let { payload, socialType } = this.props;

        return (
            <div className="SingleContact">
                <h1>{payload.firstName}</h1>
                <p>{JSON.stringify(payload)}</p>
                <p>Showing {socialType}</p>
                <button onClick={this.handleSwap}>Back</button>
            </div>
        )
    }
}

export default SingleContact;