import {Component} from 'react';
import $ from 'jquery';
import animate from 'jquery';
import '../Styles/AccountCreation.css';

export default class AccountCreation extends Component{

  constructor(props)
  {
      super(props);
      this.state= {
        md: false,
        mx: "0px"
      }
  }

  componentDidMount(){
    let context = this;

    $(document).mousemove(function(event) {
        context.setState({
          mx: ""+(event.pageX-75)+"px"
        });
    });

    console.log("hi There");
    $("#ship").on("click", ()=>
    {
        context.setState({
          md: !context.state.md
        });

    });

    //$("#ship").on("mouseup", ()=>
    //{
    //    context.setState({
    //      md: false
    //    });
    //});

    $("#ship").on("mouseover", ()=>
    {
        console.log("hi there again");

    });
    $(document).on("mousemove", ()=>
    {

        if(context.state.md){
          $("#ship").css({"left": this.state.mx});
        }

    });

  }


	render(){
		return(
      <div class = "tyra">

      <div class= "outer-container">
        <div class= "prompt">
          <p>Name</p>
          <input type="text"/>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <p>Birthday</p>
          <input type="date"/>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <p>Occupation</p>
          <input type="text"/>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <p>Hobby</p>
          <input type="text"/>
        </div>
      </div>

      <div class= "prompt">
        <p>Location</p>
        <input type="text"/>
      </div>

      <div class= "prompt">
        <p>Favorite Food</p>
        <input type="text"/>
      </div>

      <div class= "prompt">
        <p>Favorite Movie</p>
        <input type="text"/>
      </div>

      <div id= "ship" >
        <img id = "imageship" src="Boat.png" class="Icon"></img>
      </div>
      </div>



		)
	}



}
