import React,{useState,useEffect} from "react";
import { View, Text,Image,StyleSheet,FlatList,ImageBackground,TouchableOpacity,SafeAreaView,Modal } from "react-native";
import icons from "../constants/icons"
import {COLORS} from "../constants/theme"
import images from "../constants/images"
import {shoeRecentlyViewedData,shoeTrendingData} from "../apis/apis"
import {
  Svg,
  Polygon
} from 'react-native-svg';
import { BlurView } from "@react-native-community/blur";
import ModalShoe from "./ModalShoe";



const Home = (props) => {
  const [selectedShoe,setSelectedShoe] = useState(null)
  const [selectedSize,setSelectedSize] = useState('')
  const [showModal,setShowModal] = useState(false)
  const onPressItem = (value) => {
    setShowModal(true)
    setSelectedShoe(value)
  }
  const onSelectedSize = (value) => {
    setSelectedSize(value)
  }
  console.log(selectedSize)
  return (
    <View style={{flex:1,backgroundColor:COLORS.white}}>
      <SafeAreaView style={{flex:0.05,backgroundColor:COLORS.white}}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:15,
          paddingTop:10,
          alignItems:'center'
          }}>
          <TouchableOpacity>
            <Image
            source={icons.menu}
            style={{
              width:25,
              height:25
            }}
            resizeMode='contain'
            />
          </TouchableOpacity>
          <Text style={styles.txtShoe}>SHOE SELECTOR</Text>
          <TouchableOpacity>
            <Image
            source={icons.search}
            style={{
              width:25,
              height:25
            }}
            resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{flex:0.45,backgroundColor:COLORS.white}}>
          <Text style={styles.title}>TRENDING</Text>
          <FlatList
            data={shoeTrendingData}
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor= {item => item.id}
            renderItem = {({item,index}) => {
              let trendingStyle 
              if (index == 0 ) {
                trendingStyle = {marginLeft:10}
              }
              return (
              <View style={{...trendingStyle}}>
                <Text style={styles.txtType}>{item.type}</Text>
                <TouchableOpacity 
                  onPress={() => onPressItem(item)}
                  style={[styles.bgviewShoe,
                    {backgroundColor:item.bgColor}
                    ]}>
                    <View style={{ position: 'absolute', top: 0, right: 0, width: "90%", height: "100%" }}>
                      <Svg height="100%" width="100%">
                          <Polygon
                              points="0,0 160,0 160,80"
                              fill="white"
                          />
                      </Svg> 
                    </View>
                    <Image
                      resizeMode="cover"
                      source={item.img}
                      style={styles.imgTrending}
                    />
                    <View style={{flex:1,paddingHorizontal:10}}>
                      <View style={{
                        paddingTop:120,
                        width:120,
                        flex:0.65,
                        }}>
                        <Text style={styles.txtNametrending}>{item.name}</Text>
                        
                      </View>
                      <Text style={styles.txtPricetrending}>{item.price}</Text>
                    </View>
                </TouchableOpacity>
              </View>
              )
            }}
          />
      </View>
      <View style={{
        flex:0.5,
        marginTop:-60,
        backgroundColor:COLORS.white,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 5,
        },
        shadowOpacity: 0.55,
        shadowRadius: 10,
        elevation: 2,
        flexDirection:'row',
        }}>
          <View style={{flex:0.1,marginHorizontal:25}}>
            <Image 
              resizeMode="cover"
              source={images.recentlyViewedLabel}
              style={{
                width:'100%',
                height:'80%',
                marginTop:30,
            }}
            />
          </View>
          <View style={{flex:1,backgroundColor:COLORS.white}}>
            <FlatList
              data={shoeRecentlyViewedData}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              keyExtractor= {item => item.id}
              renderItem = {({item,index}) => {
                return (
                  <TouchableOpacity 
                  onPress={() => onPressItem(item)}
                  style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingVertical:20
                  }}>
                    <Image 
                      resizeMode="cover"
                      style={styles.imgRecent}
                      source={item.img}
                    />
                    <View style={{
                      paddingLeft:10
                    }}>
                      <Text style={styles.txtNameRecent}>{item.name}</Text>
                      <Text style={styles.txtPriceRecent}>{item.price}</Text>
                    </View>
                  </TouchableOpacity>
                )}}
            />
          </View>
      </View>
      {selectedShoe &&(
          <ModalShoe
            selectedShoe={selectedShoe}
            visible={showModal}
            selectedSize={selectedSize}
            onPress={() => {
              setShowModal(false)
              setSelectedSize('')
              setSelectedShoe(null)
            }}
            onSelectedSize={onSelectedSize}
            setShowModal={setShowModal}
          />
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
    txtShoe:{
      fontSize:23,
      letterSpacing:5,
      fontWeight:'300',
      color:COLORS.lightGray
    },
    bgviewShoe:{
      width:150,
      height:200,
      borderRadius:15,
      marginHorizontal:10,
      marginRight:20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4.5,
      elevation: 7,
  },
  title:{
    fontSize:23,
    padding:15,
    fontWeight:'bold',
    letterSpacing:5
  },
  txtType:{
    fontSize:15,
    color:COLORS.lightGray,
    paddingHorizontal:10,
    paddingBottom:15,
    letterSpacing:1.5
  },
  imgTrending:{
    width:170,
    height:70,
    position:'absolute',
    left:2,
    top:20,
    transform:[
      {rotate:'-15deg'}
    ]
  },
  txtNametrending:{
    fontSize:15,
    color:COLORS.white,
    fontWeight:"500"
  },
  txtPricetrending:{
    fontSize:16,
    fontWeight:'800',
    color:COLORS.white
  },
  imgRecent:{
    width:160,
    height:70,
  },
  txtNameRecent:{
    fontSize:18,
    color:COLORS.lightGray,
    fontWeight:"500",
  },
  txtPriceRecent:{
    fontSize:18,
    fontWeight:'800',
    color:COLORS.black,
    paddingVertical:5
  },
  
})

export default Home;
