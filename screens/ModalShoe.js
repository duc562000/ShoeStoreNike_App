import React,{useState,useEffect} from "react";
import { View, Text,Image,StyleSheet,FlatList,ImageBackground,TouchableOpacity,SafeAreaView,Modal } from "react-native";
import icons from "../constants/icons"
import {COLORS} from "../constants/theme"
import { BlurView } from "@react-native-community/blur";



const ModalShoe = (props) => {
    const{selectedShoe,visible,selectedSize,onPress,onSelectedSize,setShowModal} = props
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    >
        <BlurView
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
        >
            <View
            style={[styles.bgviewShoeModal,
                {backgroundColor:selectedShoe?.bgColor}
                ]}>
                <View style={{flex:0.3}}>
                <Image
                    resizeMode="cover"
                    source={selectedShoe?.img}
                    style={styles.imgModal}
                />
                </View>
                <View style={{paddingHorizontal:15,flex:0.5}}>
                
                <Text style={styles.txtNameModal}>{selectedShoe?.name}</Text>
                <Text style={styles.txtDescription}>Men's {selectedShoe?.type} Shoes</Text>
                <Text style={styles.txtPriceModal}>{selectedShoe?.price}</Text>
                
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    flex:1,
                    flexWrap:'wrap',
                    }}>
                    <Text style={styles.txtSeletedSize}>Select size</Text>
                    {selectedShoe?.sizes.map((i,index) => {
                    return (
                        <TouchableOpacity 
                        key={index}
                        onPress={() => onSelectedSize(i)}
                        style={{
                        marginVertical:2,
                        borderWidth:1.5,
                        width:32,
                        height:25,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:5,
                        borderColor:COLORS.white,
                        backgroundColor:selectedShoe?.sizes[index] === selectedSize ? COLORS.white : null
                        }}>
                        <Text style={[styles.txtSize,
                            {color:selectedShoe?.sizes[index] === selectedSize ? COLORS.black : COLORS.white}
                            ]}>
                            {i}</Text>
                        </TouchableOpacity>
                    )
                    })
                    }
                </View>
                </View>
                <TouchableOpacity 
                onPress={onPress}
                style={{
                backgroundColor:"rgba(0,0,0,0.5)",
                borderRadius:15,
                flex:0.2,
                alignItems:'center',
                justifyContent:'center'
                }}>
                    <Text style={styles.txtAddtoBag}>Add to Bag</Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    </Modal>   
      )
};

const styles = StyleSheet.create({
    bgviewShoeModal:{
        width:'85%',
        flex:0.45,
        justifyContent:'center',
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4.5,
        elevation: 7,
      },
      imgModal:{
        width:300,
        height:120,
        position:'absolute',
        left:3,
        top:-50,
        transform:[
          {rotate:'-15deg'}
        ]
      },
      txtNameModal:{
        fontSize:24,
        color:COLORS.white,
        paddingVertical:5
      },
      txtDescription:{
        fontSize:20,
        color:COLORS.gray,
        textTransform:'capitalize',
        paddingVertical:3
      },
      txtPriceModal:{
        fontSize:32,
        fontWeight:'800',
        paddingVertical:10,
        color:COLORS.white
      },
      txtSeletedSize:{
        fontSize:16,
        color:COLORS.white,
        fontWeight:'500',
        paddingRight:5
      },
      txtSize:{
        fontSize:16,
        color:COLORS.white,
        fontWeight:'500',
      },
      txtAddtoBag:{
        fontSize:30,
        color:COLORS.white,
        fontWeight:'600',
        letterSpacing:1
      }
})

export default ModalShoe;
