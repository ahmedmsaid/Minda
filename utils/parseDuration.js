exports.parseDuration=(durationString)=>{
    const parts = durationString.split(':');
    let durationInSeconds = 0;
  
    if (parts.length === 2) {
      durationInSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      durationInSeconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
  
    return durationInSeconds;
  }
  