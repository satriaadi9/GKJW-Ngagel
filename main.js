$(document).ready(function(){
    getRemaining();
    // const interval = setInterval(function(){
    //     getRemaining();
    // },5000)
    $("#btn-jemaat").click(function(){
        document.getElementById("conhome").hidden = true;
        document.getElementById("con-jem").hidden = false;
    })
    $("#btn-tamu").click(function(){
        document.getElementById("conhome").hidden = true;
        document.getElementById("con-tam").hidden = false;
    })
    $("#btnbackjem").click(function(){
        document.getElementById("conhome").hidden = false;
        document.getElementById("con-jem").hidden = true;
    })
    $("#btnbacktam").click(function(){
        document.getElementById("conhome").hidden = false;
        document.getElementById("con-tam").hidden = true;
    })
    $("#btnnextjem").click(function(){
        var lanjut=true;
        var namajemaat = $("#namajemaat").val();
        var nikjemaat = $("#nikjemaat").val();
        var umurjemaat = $("#umurjemaat").val();
        var wilayah = $("#select-wilayah").val();
        var kelompok = $("#select-kelompok").val();

        if(namajemaat=="" || nikjemaat=="" || umurjemaat == "" || wilayah == "" || kelompok == ""){
            lanjut=false;
        }
        
        if(lanjut){
            //modal jemaat
            $("#mnamajemaat").text(namajemaat);
            $("#mnikjemaat").text(nikjemaat);
            $("#musiajemaat").text(umurjemaat);
            $("#mwilayah").text(wilayah);
            $("#mkelompok").text(kelompok);
            $('#modalJemaat').modal('show');
            return false;
        }
        else{
            alert("Mohon cek kembali inputan Anda!");
            return false;
        }
    })
    $("#btnnexttam").click(function(){
        var lanjut=true;
        var namatamu = $("#namatamu").val();
        var niktamu = $("#niktamu").val();
        var umurtamu = $("#umurtamu").val();
        var gerejaasal = $("#gerejaasal").val();

        if(namatamu=="" || niktamu=="" || umurtamu == "" || gerejaasal == ""){
            lanjut=false;
        }
        
        if(lanjut){
            //modal tamu
            $("#mnamatamu").text(namatamu);
            $("#mniktamu").text(niktamu);
            $("#musiatamu").text(umurtamu);
            $("#masaltamu").text(gerejaasal);
            $('#modalTamu').modal('show');
            return false;
        }
        else{
            alert("Mohon cek kembali inputan Anda!");
            return false;
        }
    })
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

var sisaquota = 0;
// async function loadData(){
//     const data = await axios.get('https://gkjw-ngagel-api.herokuapp.com/api/nearest');
//     var sisa = data.remaining;
//     console.log(sisa);
// }


var TOKEN = "1|RcUIPpe8iY3bmNaYleZh23yevOVe0FtXxaWK1MQd"
const config = {
    headers: { Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json" }
};

var idibadah;
var next;
function getRemaining(){
    // console.log(data);
    axios.get('https://gkjw-ngagel-api.herokuapp.com/api/nearest',config).then(function(response){
        var result = response.data;
        sisaquota = result.remaining;
        idibadah = result.id_ibadah;
        next = result.next;
    }).catch(function (error) {
        // handle error
        document.getElementById("tdremaining").innerText = error;
    }).then(function(){
        if(parseInt(sisaquota)<=0){
            document.getElementById("tdremaining").innerText = "Kuota Habis";
            $("#tdremaining").css('color','red');
        }
        else{
            document.getElementById("tdremaining").innerText = sisaquota;
            $("#tdremaining").css('color','black');
        }
        
    })
}

const header = {
    headers: { 'Authorization': `Bearer ${TOKEN}`,
    'Accept': "application/json",
    'Content-Type': "application/x-www-form-urlencoded" }
};



// async function postJemaat(){
//     $("#modalJemaat").modal('hide');
//     document.getElementById("con-jem").hidden = true;
//     document.getElementById("con-jem-success").hidden = false;
//     $("#next-jem").text(next);
//     $("#nama-jem").text($("#namajemaat").val());
//     // getQR();
//     var datajemaat = {
//         id_ibadah: idibadah,
//         nik: $("#nikjemaat").val(),
//         nama_jemaat: $("#namajemaat").val(),
//         wilayah: $("#select-wilayah").val(),
//         kelompok: $('#select-kelompok').val(),
//         umur: $("#umurjemaat").val()
//     }
//     var he = await axios.post('https://gkjw-ngagel-api.herokuapp.com/api/registration', datajemaat, config).then(function(response){
//         console.log(response.data)
//         console.log(response.data.uuid)
//         var qrcode = new QRCode(document.getElementById("qrcodejem"), {
//             text: response.data.uuid,
//             width: 240,
//             height: 240,
//             colorDark : "#000000",
//             colorLight : "#ffffff",
//             correctLevel : QRCode.CorrectLevel.H,
//             crossOrigin: "Anonymous"
//         });
//         $('#qrcodejem img').css('border-color','#C8DDF2');
//         $('#qrcodejem img').css('border-width','0.5em');
//         $('#qrcodejem img').css('border-style','solid');
//         $('#qrcodejem img').css('border-radius','10px');
//         $('#qrcodejem img').css('padding','1em');
//     })
// }

function postJemaat(){
    $("#modalJemaat").modal('hide');
    document.getElementById("con-jem").hidden = true;
    document.getElementById("con-jem-success").hidden = false;
    $("#next-jem").text(next);
    $("#nama-jem").text($("#namajemaat").val());
    var datajemaat = {
        id_ibadah: idibadah,
        nik: $("#nikjemaat").val(),
        nama_jemaat: $("#namajemaat").val(),
        wilayah: $("#select-wilayah").val(),
        kelompok: $('#select-kelompok').val(),
        umur: $("#umurjemaat").val()
    }
    axios.post('https://gkjw-ngagel-api.herokuapp.com/api/registration', datajemaat, config).then(function(response){
        //magic
        var he = JSON.stringify(response.data);
        const hehe = he.split('{"uuid":"').pop();
        var uuid = hehe.substring(0,36);
        var qrcode = new QRCode(document.getElementById("qrcodejem"), {
            text: uuid,
            width: 240,
            height: 240,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            crossOrigin: "Anonymous"
        });
        $('#qrcodejem img').css('border-color','#C8DDF2');
        $('#qrcodejem img').css('border-width','0.5em');
        $('#qrcodejem img').css('border-style','solid');
        $('#qrcodejem img').css('border-radius','10px');
        $('#qrcodejem img').css('padding','1em');
    }).catch(function (error) {
       $("#qrcodejem").text('Pendaftaran Gagal! NIK sudah terdaftar');
    })
}

function postTamu(){
    $("#modalTamu").modal('hide');
    document.getElementById("con-tam").hidden = true;
    document.getElementById("con-tam-success").hidden = false;
    $("#next-tam").text(next);
    $("#nama-tam").text($("#namatamu").val());
    var datatamu = {
        id_ibadah: idibadah,
        nik: $("#niktamu").val(),
        nama_jemaat: $("#namatamu").val(),
        gereja_asal: $("#gerejaasal").val(),
        umur: $("#umurtamu").val()
    }
    axios.post('https://gkjw-ngagel-api.herokuapp.com/api/registration', datatamu, config).then(function(response){
        //magic
        var he = JSON.stringify(response.data);
        const hehe = he.split('{"uuid":"').pop();
        var uuid = hehe.substring(0,36);
        var qrcode = new QRCode(document.getElementById("qrcodetam"), {
            text: uuid,
            width: 240,
            height: 240,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H,
            crossOrigin: "Anonymous"
        });
        $('#qrcodetam img').css('border-color','#C8DDF2');
        $('#qrcodetam img').css('border-width','0.5em');
        $('#qrcodetam img').css('border-style','solid');
        $('#qrcodetam img').css('border-radius','10px');
        $('#qrcodetam img').css('padding','1em');
    }).catch(function (error) {
       $("#qrcodetam").text('Pendaftaran Gagal! NIK sudah terdaftar');
    })
}

// function downqrjem(){
//     window.scrollTo(0,0);
//     domtoimage.toJpeg(document.getElementById('con-jem-success'), { cacheBust: true }, { quality: 0.95 })
//     .then(function (dataUrl) {
//         var link = document.createElement('a');
//         link.download = 'my-image-name.jpeg';
//         link.href = dataUrl;
//         link.click();
//     });
// }
// function hehe(){
//     document.getElementById("anjay").innerText = sisaquota;
// }

// function getDataRequest(){
//     axios.get('https://gkjw-ngagel-api.herokuapp.com/api/nearest').then(function(response){
//         return response.data.remaining;
//     })
// }