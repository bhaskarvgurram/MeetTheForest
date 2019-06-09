'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ViroScene,
  ViroImage,
} from 'react-viro';

var OnHoverExample = React.createClass({
  render: function() {
    return (
      <ViroScene>
        <ViroImage source={require('./res/grid_bg.jpg')} 
                   position={[0, -.5, -2]} scale={[.1, .1, .1]} 
                   onClick={this._onClick}
                   onClickState={this._onClickState}
                   onDrag={this._onDrag}
                   onHover={this._onHoverDoSomething}
                   onScroll={this._onScroll}
                   onSwipe={this._onSwipe}
                   onTouch={this._onTouch}
                   onFuse={{callback:this._onFuse, timeToFuse:3000}}/>
      </ViroScene>
    );
  }, 
    
  _onClick(source) {
    console.log("We just Clicked the image!");
  },
    
  _onClickState(state, source) {
    if(stateValue == 1) {
        console.log("User has click-down on the image!");
    } else if(stateValue == 2) {
        console.log("User has click-up on the image!");
    } else if(stateValue == 3) { 
        console.log("User has finally clicked on the image!");
    }
  },
    
  _onDrag(draggedToPosition, source) {
    console.log("Dragged to: x" + draggedToPosition[0] + " y:" + draggedToPosition[1] + " z: " + draggedToPosition[2]); 
  },
    
  _onHoverDoSomething(isHovering, source) {
    if(isHovering) {
      console.log("We are hovering onto the image!");
    }else{
      console.log("We are not longer hovering on the image!");
    }   
  },
  
  _onScroll(scrollPosition, source) {
     console.log("Scrolled to: x" + scrollPosition[0] + " y:" + scrollPosition[1]); 
  },
    
  _onSwipe(swipeState, source) {
    if(swipeState == 1) {
        console.log("Swiped up");
    } else if(swipeState == 2) {
        console.log("Swiped down");
    } else if(swipeState == 3) { 
       console.log("Swiped left");
    } else if(swipeState == 4) { 
       console.log("Swiped right");
    }
  },
  
  _onTouch(state, touchPos, source)  {
   var touchX = touchPos[0];
   var touchY = touchPos[1];
    if(state == 1) {
        // Touch Down
    } else if(state == 2) {
        // Touch Down Move
    } else if(state == 3) { 
        // Touch Up
    }
  },
  
  _onFuse(source){
   // User has hovered over object for timeToFuse milliseconds
  },  
});

module.export = OnHoverExample