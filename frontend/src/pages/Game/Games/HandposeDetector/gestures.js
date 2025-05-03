// gestures.js
import * as fp from "fingerpose";

// Thumbs Up 👍
export const ThumbsUpGesture = new fp.GestureDescription("thumbs_up");
ThumbsUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
ThumbsUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);

// Thumbs Down 👎
export const ThumbsDownGesture = new fp.GestureDescription("thumbs_down");
ThumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
ThumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);

// OK Hand 👌
export const OKHandGesture = new fp.GestureDescription("ok_hand");
OKHandGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
OKHandGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

// Victory Hand (Peace) ✌️
export const VictoryGesture = new fp.GestureDescription("victory");
VictoryGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
VictoryGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
VictoryGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
VictoryGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

// Crossed Fingers 🤞
export const CrossedFingersGesture = new fp.GestureDescription("crossed_fingers");
CrossedFingersGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
CrossedFingersGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
CrossedFingersGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
CrossedFingersGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

// Love-You Gesture 🤟
export const LoveYouGesture = new fp.GestureDescription("love_you");
LoveYouGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
LoveYouGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
LoveYouGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

// Vulcan Salute 🖖
export const VulcanSaluteGesture = new fp.GestureDescription("vulcan_salute");
VulcanSaluteGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
VulcanSaluteGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
VulcanSaluteGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
VulcanSaluteGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

// Raised Hand ✋
export const RaisedHandGesture = new fp.GestureDescription("raised_hand");
RaisedHandGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
RaisedHandGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
RaisedHandGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
RaisedHandGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
RaisedHandGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

// Call Me Hand 🤙
export const CallMeHandGesture = new fp.GestureDescription("call_me_hand");
CallMeHandGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
CallMeHandGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

// Add more gestures as needed...