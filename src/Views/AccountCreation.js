import {Component} from 'react';
import $ from 'jquery';
import animate from 'jquery';
import '../Styles/AccountCreation.css';
import ImageUploader from 'react-images-upload'

export default class AccountCreation extends Component{

  constructor(props)
  {
      super(props);
      this.state= {
        md: false,
        mx: "0px",
        nmx: "0px"
      }
  }

  componentDidMount(){
    let context = this;

    $(document).mousemove(function(event) {
        context.setState({
          mx: ""+(event.pageX-75)+"px",
          nmx: "-"+(event.pageX*2)+"px"
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
    $(document).on("mousemove", (event)=>
    {

        if(context.state.md){
          $("#ship").css({"left": this.state.mx});
          console.log("to tyra");
          $(".oouter").css({"left": (this.state.nmx)});

          if(event.pageX>$(window).width()*0.95){
            window.location.href = "/home";
          }
        }


    });

  }
  readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
            }
  }


	render(){
		return(
      <div class = "tyra">
      <div class = "oouter">
      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Profile Picture</p>
            <ImageUploader withPreview="true"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Name</p>
            <input type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Birthday</p>
            <input type="date"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Occupation</p>
            <input type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Hobby</p>
            <input type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Location</p>
            <input type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Favorite Food</p>
            <input type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Favorite Movie</p>
            <input type="text" maxlength="20"/>
          </div>
        </div>
      </div>


      </div>
      <div id= "ship" >
        <img id = "imageship" src="Boat.png" class="Icon"></img>
      </div>
      </div>



		)
	}



}
