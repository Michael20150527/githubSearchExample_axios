import React, { Component } from 'react'
import axios from 'axios'

export default class index extends Component {

    search = () => {
        // 获取用户的输入（连续解构赋值+重命名）
        const {keywordElement:{value:keyword}} = this;
        // 发送请求前通知App更新状态
        this.props.updateAppState({isFirst:false, isLoading:true})
        // /api1必须紧随端口号
        axios.get(`http://localhost:3000/api1/search/users?q=${keyword}`).then(
            response => {
                // 请求成功后通知App更新状态
                this.props.updateAppState({isLoading:false, users:response.data.items})
            },
            error => {
                // 请求失败后通知App更新状态
                this.props.updateAppState({isLoading:false, err:error.message})
            }
        )
    }

    render() {
        return (
        <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
            <input type="text" ref={c => this.keywordElement = c} placeholder="enter the name you search"/>&nbsp;
            <button onClick={this.search}>Search</button>
            </div>
        </section>
        )
    }
}
