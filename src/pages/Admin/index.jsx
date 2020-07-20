import React, { Component } from "react"

import Analysis from "./Analysis"
import Scale from "./Scale"
import Search from "./Search/index"
import Static from './Static/index'
export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis />
        <Scale />
        <Search />
        <Static/>
      </div>
    )
  }
}
