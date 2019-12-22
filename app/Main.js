import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions,TextInput,StatusBar, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'

import Animated ,{Easing} from 'react-native-reanimated'
import {TapGestureHandler, State} from 'react-native-gesture-handler'
import Svg,{Image,Circle,ClipPath} from 'react-native-svg'


const {height,width} = Dimensions.get('window'); // to run before the runApplication
const {Value,event,block,cond,eq,set,Clock,startClock,stopClock,
    debug,timing, clockRunning,interpolate,Extrapolate,concat} = Animated; // shortcut to "Animated.smoithing"


//----------------------------------------TIMING AND REANImation--------------------------
function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
  
    const config = {
      duration: 1000,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };
  
    return block([ //Reanimated the button
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position
    ]);
  }
export class Welcome extends Component {

    state = {
        name: '',
      };

constructor(){
    super();
    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
        {
            nativeEvent:({state})=>block([ //run  the following code in order
                      
                cond(eq(state,State.END), set(this.buttonOpacity,runTiming(new Clock(), 1, 0))) // if the event is end we execute the aanimation
            ])
        }
    ]);

    this.OnCloseState = event([
        {
            nativeEvent:({state})=>block([ //run  the following code in order
                      
                cond(eq(state,State.END), set(this.buttonOpacity,runTiming(new Clock(), 0, 1))) // if the event is end we execute the aanimation
            ])
        }
    ]);
// Other animation

this.buttonY = interpolate(this.buttonOpacity,{
    inputRange:[0,1],
    outputRange:[100,0],
    extrapolate: Extrapolate.CLAMP // to make sure that the animation do not extrepolate themselves

});

this.bgY = interpolate(this.buttonOpacity,{ // background of button animation
    inputRange:[0,1],
    outputRange:[-height / 3 - 50 ,0],
    extrapolate: Extrapolate.CLAMP 
});

this.textInputZindex = interpolate(this.buttonOpacity,{
    inputRange:[0,1],
    outputRange:[1,-1],
    extrapolate: Extrapolate.CLAMP 
});
this.textInputY = interpolate(this.buttonOpacity, {
    inputRange:[0,1],
    outputRange:[0,100],
    extrapolate: Extrapolate.CLAMP 
});

this.textInputOpacity = interpolate (this.buttonOpacity, {
    inputRange:[0,1],
    outputRange:[1,0],
    extrapolate: Extrapolate.CLAMP 
});

this.rotateCross = interpolate (this.buttonOpacity, {
    inputRange:[0,1],
    outputRange:[180,360],
    extrapolate: Extrapolate.CLAMP 
});





}

    render() {
        return (
            
           <View style={{flex:1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
                <StatusBar  hidden={false} />
               
                <Animated.View style={{...StyleSheet.absoluteFill, transform:[{translateY:this.bgY}]}}>


                      <Svg height={height+50} width={width}> 
                      <ClipPath id='clip'>
                          <Circle r={height+50} cx={width / 2}/>

                      </ClipPath>
                    <Image  href={require('../assets/doc.png')} // Image
                    height={height + 50} width={width}
                    preserveAspectRatio='xMidYMid slice'
                    clipPath="url(#clip)"
                    /></Svg>

                </Animated.View>

                <View style={{height: height/3, justifyContent: 'center'}}>

                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>

                    <Animated.View style={{...styles.button, marginTop: 60, opacity:this.buttonOpacity, 
                        transform:[{translateY:this.buttonY}]}}>
                        <Text style={{fontWeight:'bold', fontSize: 15}}>SIGN IN</Text>
                    </Animated.View>

                    </TapGestureHandler>    

                    <Animated.View style={{...styles.button, backgroundColor:'red',marginTop: 5, opacity:this.buttonOpacity, 
                    transform:[{translateY:this.buttonY}]}}>
                        <Text style={{fontWeight:'bold', fontSize: 15, color:'white'}}>REGISTER</Text>
                    </Animated.View>


                    


                    <Animated.View style={{height: height/3, ...StyleSheet.absoluteFill,
                        top:null,justifyContent:'center',
                         zIndex: this.textInputZindex,
                         opacity:this.textInputOpacity,
                         transform:[{translateY:this.textInputY}]}}>

                             <TapGestureHandler onHandlerStateChange={this.OnCloseState}>
                                 <Animated.View style={styles.closeButton}>

                                     <Animated.Text style={{fontSize:15, transform:[{rotate: concat(this.rotateCross,'deg')}]}}>X</Animated.Text>

                                 </Animated.View>
                             </TapGestureHandler>
                        
                        <TextInput  placeholder= "Nom" style={styles.textInput} placeholderTextColor="black" 
                        onChangeText={(text)=>{this.setState({name: text,})}} />

                        <TextInput  placeholder= "Password" style={styles.textInput} placeholderTextColor="black" secureTextEntry={true} />
                            
                        <TouchableOpacity  onPress={()=>{let e = this.state.name
                                                          if (e == ''){
                                                          Actions.chat({user: 'Guest'})}
                                                           else{
                                                        Actions.chat({user: this.state.name })}}}>

                                                            
                            <Animated.View style={{...styles.button}}>

                                <Text style={{fontWeight:'bold', fontSize: 15}}>SIGN IN</Text>

                            </Animated.View>
                            </TouchableOpacity>
                    </Animated.View> 


                   





                </View>

           </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: { 

        backgroundColor: 'white',
        height: 65,
        borderRadius: 35,
        marginHorizontal : 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset:{width: 5 , height: 5},
        shadowColor : 'black', 
        shadowOpacity : 0.2,
        elevation: 3,
        
      
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 4,
        borderColor: 'rgba(0,0,0,0.2)'

    },
    closeButton:{
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -23,
        left: width / 2 - 20,
        shadowOffset:{width: 5 , height: 5},
        shadowColor : 'black', 
        shadowOpacity : 0.2,
        elevation: 3,
        


    }
  });

export default Welcome
