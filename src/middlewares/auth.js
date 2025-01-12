const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token === 'xyz';
    if(isAdminAuthorized) {
        next();
    } else {
        res.sttus(401).send("Unauthorized reqeust");
    }
}

module.exports = { adminAuth }