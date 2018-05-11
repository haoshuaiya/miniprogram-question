// pages/index/index.js
const baseUrl = require('../../config.js').baseUrl
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        id:'',
        currentIndex: -1,
        title: '',
        wrongArr:[]
    },
    index2Word(val) {
        return String.fromCharCode(val - 0 + 65)
    },
    getList() {
        wx.request({
            url: baseUrl + '/Api/Question/getSpecificQuestion',
            data: {
                token: 'b83934df8c5a4a4c500662bc88c44768goyIrK-10GezuYPdrtGrzMW4nqF-n6KXgXOBzZ2petOYpYmZxajRpr64e5mut43cr7WdroKvdN-Cnmee',
                question_id: this.data.id
            },
            success: res => {
                this.setData({
                    title: res.data.data[0].title
                })
                let result = JSON.parse(res.data.data[0].content), temp = []
                for (let i = 0; i < result.length; i++) {
                    let checked
                    if (result[i].type === 'single') {
                        checked = ''
                    } else {
                        checked = []
                    }
                    let options = []
                    for (let j = 0; j < result[i].options.length; j++) {
                        options.push({
                            name: result[i].options[j],
                            value: this.index2Word(j),
                            checked: false
                        })
                    }
                    temp.push({ ...result[i], index: (i + 1), checked: checked, options: options })
                }
                this.setData({
                    list: temp
                })
                wx.setStorage({
                    key: 'exam',
                    data: temp,
                })
                wx.setStorage({
                    key: 'title',
                    data: res.data.data[0].title,
                })
                wx.setStorage({
                    key: 'exam_id',
                    data: res.data.data[0].id,
                })
            }
        })
    },    
    // 开始答题
    next(){
        this.setData({
            currentIndex:this.data.currentIndex+1
        })
        if(this.data.currentIndex === this.data.list.length){
            let temp = this.data.list.filter(val=>{
                console.log(val.answer.toString(),val.checked.toString())
                return val.answer.toString() !== val.checked.toString()
            })
            for(let i=0;i<temp.length;i++){
                for(let j=0;j<temp[i].options.length;j++){
                    if(temp[i].type === 'single' && temp[i].options[j].value === temp[i].checked){
                        temp[i].options[j] = { ...temp[i].options[j],checked:true}
                    }
                    if (temp[i].type === 'multiple' && temp[i].checked.indexOf(temp[i].options[j].value)) {
                        temp[i].options[j] = { ...temp[i].options[j], checked: true }
                    }
                }
            }
            this.setData({
                wrongArr:temp
            })
            wx.setStorage({
                key: 'wrong',
                data: temp,
            })
        }
        wx.setStorage({
            key: 'current',
            data: this.data.currentIndex,   
        })
    },
    // 选择
    checkChange(e){
        let key = 'list[' + this.data.currentIndex + '].checked'
        this.setData({
           [key]:e.detail.value.sort()
        })
    },
    radioChange(e){
        let key = 'list[' + this.data.currentIndex + '].checked'
        this.setData({
            [key]: e.detail.value
        })
    },
    // 按钮文本
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id:options.id
        })
        if(wx.getStorageSync('exam_id')==options.id){
            this.setData({
                list:wx.getStorageSync('exam'),
                title: wx.getStorageSync('title'),
                currentIndex:wx.getStorageSync('current'),
                wrongArr:wx.getStorageSync('wrong') || []
            })
        }else{
            this.getList()
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
   
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        wx.setStorage({
            key: 'exam',
            data: this.data.list,
        })
        wx.setStorage({
            key:'current',
            data:this.data.currentIndex
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        wx.setStorage({
            key: 'exam',
            data: this.data.list,
        })
        wx.setStorage({
            key: 'current',
            data: this.data.currentIndex
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})