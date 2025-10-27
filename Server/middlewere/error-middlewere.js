const errormiddlewere = (err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "backend error";
    const extradetails = err.extradetails || "ERROR FROMBACKEND" ;

    return res.status(status).json({message, extradetails});

};

module.exports = errormiddlewere;