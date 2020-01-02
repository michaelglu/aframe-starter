const generateMessage=(from,isWelcome,x,y,z,newId)=>{
  return{
    from,
    isWelcome,
    x,
    y,
    z,
    newId,
    createdAt:new Date().getTime()
  }
}

module.exports={generateMessage};
