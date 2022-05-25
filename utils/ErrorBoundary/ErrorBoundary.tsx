import React, { Children, Component } from "react";
import axios from "axios";
type Props = { children: React.ReactNode; fallback: React.ReactNode };
type State = { error: null | string | boolean };

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
    this.checkNetwork = this.checkNetwork.bind(this);
  }
  componentDidMount() {
    //this.timer = setInterval(this.checkNetwork, 1000);
  }
  componentWillUnmount() {
    //clearInterval(this.timer);
  }
  static getDeriveStateFromError(error: string) {
    return { error };
  }
  async checkNetwork() {
    let res = await axios.get(".");
    if (res.status > 200) this.setState({ error: true });
    else this.setState({ error: false });
  }
  render() {
    const { error } = this.state;
    const { fallback, children } = this.props;
    if (error) return fallback;
    return children;
  }
}
