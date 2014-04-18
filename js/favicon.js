$(document).ready(function() {
    var config = {
        siteIcon:'http://www.google.com/s2/favicons?domain={{siteUrl}}',
    };
    function getIcon() {
        var siteUrl = $('#omniinput').val();
        // var siteUrl = 'www.douban.com';
        var imgUrl = config.siteIcon.replace('{{siteUrl}}', siteUrl);
        // var imgUrl = 'http://mail.qq.com/favicon.ico';
        // this.saveIcon(imgUrl);
        // this.loaderImg(imgUrl);
    }
});