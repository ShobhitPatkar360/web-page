// Crating a function for searching operaton
class ApiFeature{
    constructor(query,querryStr) {
        this.query=query;
        this.querryStr=querryStr;
    }


    search() {
        const keyword=(this.querryStr.keyword)?{
            name:{
                $regex:this.querryStr.keyword, // if queryString in present in the output content
                $option:"i"
            }
        }:{};
        this.query=this.query.find({...keyword}); // if any document/content having keyword then make that as query
        // console.log("query check",this.query)
        return this; // return that query
    }

    filter() {
        const queryCopy={...this.querryStr};
        //removing the unwanted parms
        console.log(this.querryStr);
        const keywords=["keyword","skip","limits","page"];
        keywords.forEach(keys=>delete queryCopy[keys]);
        
        console.log(queryCopy);

        // filter from price and rating
        let querryStr=JSON.stringify(queryCopy);
        querryStr=querryStr.replace(/eq|gt|gte|lt|lte/gi,keys=>`$${keys}`);
        console.log(querryStr);
        this.query=this.query.find(JSON.parse(querryStr));
        
        return this

    }

    pagination(productPerPage) {
        const currentPage=this.querryStr.page||1;
        const skipProducts=productPerPage*(currentPage-1);

        this.query=this.query.limit(productPerPage).skip(skipProducts);
        return this;

    }
}

module.exports=ApiFeature;