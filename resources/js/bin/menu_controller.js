class Lists extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      lists: ['loading..']
    };
  }

  updateList() {
    //console.log(this);
    let next = function (data) {
      this.setState({
        lists: data
      });
    }.bind(this);

    DB.getListNames(next);
  }

  componentDidMount() {
    this.timerID = setInterval(this.updateList.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  clickList(list_name) {
    console.log(list_name);
  }
  /**
   *서버와 통신해서 리스트들의 이름을 가져온다.
   */


  render() {
    var list_names = [];

    for (let i of this.state.lists) list_names.push( /*#__PURE__*/React.createElement("p", {
      key: "list_name_" + i,
      onClick: () => {
        this.clickList(i);
      }
    }, i)); //console.log(list_names)


    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "List Names"), list_names);
  }

}

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement(Lists, null);
  }

}