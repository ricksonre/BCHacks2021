import {Component} from 'react';
import $ from 'jquery';
import animate from 'jquery';
import '../Styles/AccountCreation.css';
import ImageUploader from 'react-images-upload'
import Button from '@material-ui/core/Button'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import UpdateUserProfile from "../UpdateUserProfile";
import HandleImage from '../HandleImage'
import mimeDb from "mime-db";
import {Link} from 'react-router-dom'

export default class AccountCreation extends Component{

  constructor(props)
  {
      super(props);
      this.state= {
        md: false,
        mx: "0px",
        nmx: "0px",
          showSubmit: false,
      }
  }

  componentDidMount(){
    let context = this;

    $(document).mousemove(function(event) {
        context.setState({
          mx: ""+(event.pageX-75)+"px",
          nmx: `calc(-${event.pageX*0.20}vw + 15vw)`
        });
    });

    console.log("hi There");
    $("#ship").on("click", ()=>
    {
        context.setState({
          md: !context.state.md
        });

    });

    $("#ship").on("mousemove", (event)=>
    {
      if (event.pageX < $(window).width() * 0.9 && event.pageX > $(window).width() * 0.05)
      {
          $("#ship").css({ "left": this.state.mx });
          console.log("to tyra");
          $(".oouter").css({ "left": (this.state.nmx) });
      }

        if(event.pageX>$(window).width()*0.8)
        {
          //XXXXXXXXX
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

    setupProfile()
    {

          console.log($('#name').val())
          let data = {
              name: $('#name').val(),
              birthday: $('#bday').val(),
              occupation: $('#occ').val(),
              hobby: $('#hobby').val(),
              location: $('#location').val(),
              food: $('#food').val(),
              movie: $('#movie').val(),
              uid: this.props.uid,
              image: this.state.picture ? mimeDb[this.state.picture[0].type].extensions[0] : false,
          }

        localStorage.setItem("hasAProfile", true);

        UpdateUserProfile(this.props.firebase, data, this.props.uid);
          HandleImage(this.state.picture, this.props.uid, this.props.firebase)

    }


	render(){
		return(
      <div class = "tyra">
      <div class = "oouter">
      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Profile Picture</p>
            <ImageUploader withPreview="true" onChange={(pic) => this.setState({picture: pic})} singleImage={true}/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Name</p>
            <input id={'name'} type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Birthday</p>
            <input id={'bday'} type="date"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Occupation</p>
            <input id={'occ'} type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Hobby</p>
            <input id={'hobby'} type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Location</p>
            <input id={'location'} type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Favorite Food</p>
            <input id={'food'} type="text" maxlength="20"/>
          </div>
        </div>
      </div>

      <div class= "outer-container">
        <div class= "prompt">
          <div class= "inner-container">
            <p>Favorite Movie</p>
            <input id={'movie'} type="text" maxlength="20"/>
          </div>
        </div>
      </div>


      </div>
          {this.state.showSubmit &&
          (
              <Link to={'/profile'}>
              <Button style={{width: '20em', height: '5em', backgroundColor: '#084DFF', position: 'absolute', left: 'calc(50% - 10em)', bottom: '20%',
              color: 'white', fontWeight: 'bold', fontSize: '1.1em'}} onClick={() => this.setupProfile()}>
                  Submit
                  <ArrowForwardIosIcon fontsize={'sm'} style={{marginLeft: '1em'}}/>
              </Button>
              </Link>)}
      <div id= "ship" >
        <img id = "imageship" src="Boat.png" class="Icon"></img>
      </div>


      </div>



		)
	}



}
