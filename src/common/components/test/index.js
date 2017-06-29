// 注册页
import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { uploadString } from '../../apis'

@inject('commonStore')
export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      str: '这是测试的输出',
    }
  }

  componentWillMount() {
    this.props.commonStore.setTitle('JS前后端调试案例')
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }


  handleChange = (event) => {
    this.setState({
      str: event.target.value,
    })
  }

  handleSubmit = () => {
    const { str } = this.state

    uploadString({ string: str})
    .then(resp => resp.json())
    .then((resp) => {
      alert('提交成功')
    })
  }


  render() {
    const { str } = this.state

    return (
      <div className="test">
        <input placeholder="请输入任意字符" onChange={this.handleChange} />
        <p>{str}</p>
        <div onClick={this.handleSubmit}>点我提交字符串</div>
      </div>
    )
  }
}
