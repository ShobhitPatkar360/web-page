// Crating a function for searching operaton
class ApiFeature{
    constructor(query,queryStr) {
        this.query=query;
        this.queryStr=queryStr;
    }


    search() {
        const keyword=(this.queryStr.keyword)?{
            name:{
                $regex:this.queryStr.keyword // if queryString in present in the output content
                
            }
        }:{};
        this.query=this.query.find({...keyword}); // if any document/content having keyword then make that as query
        return this; // return that query
    }

    filter() {
        const queryCopy={...this.querryStr};
        //removing the unwanted parms
        console.log(this.querryStr);
        const keyword=["keyword","skip","limits"];
        keyword.forEach(keys=>delete queryCopy[keys]);
        

        this.query=this.query.find(queryCopy);
        console.log(queryCopy);
        return this;
    }
}

module.exports=ApiFeature;