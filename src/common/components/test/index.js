// 注册页
import React, { Component } from 'react'
import { inject } from 'mobx-react'

@inject('commonStore')
export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '这是测试的输出',
    }
  }

  componentWillMount() {
    this.props.commonStore.setTitle('JS前后端调试案例')
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }


  handleChange = (val) => {
    this.setState({
      input: val,
    })
  }


  render() {
    const { input } = this.state

    return (
      <div className="test">
        <input placeholder="请输入任意字符" onChange={this.handleChange} />
        <p>{input}</p>
      </div>
    )
  }
}
