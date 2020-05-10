'use strict'
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.fillRect(0, 0, canvas.width, canvas.height)
let backgroundPicture = new Image()
backgroundPicture.src = canvas.toDataURL()
$('.te-form').hide()


let clearForm = () => {
  $('#textWP').val('')
  $('#widthTextPos').val(50)
  $('#heightTextPos').val(50)
  $('#textRot').val(50)
  $('#textSize').val(50)
}


let draw = () => {
  ctx.drawImage(backgroundPicture, 0, 0, canvas.width, canvas.height)

  ctx.fillStyle = $('#colorText').val()
  ctx.font = `${200 * $('#textSize').val() / 100}pt ${$('#textFont').val()}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.save()
  ctx.translate($('#widthTextPos').val() / 100 * 1080, (100 - $('#heightTextPos').val()) / 100 * 1920)
  ctx.rotate(($('#textRot').val() - 50) * 2 / 100 * Math.PI)
  ctx.fillText($('#textWP').val(), 0, 0)
  ctx.restore()
}

let newText = () => {
  $('.te-button').hide()
  $('.te-form').show()
}

let saveText = () => {
  $('.te-button').show()
  $('.te-form').hide()
  backgroundPicture.src = canvas.toDataURL()
  clearForm()
}

let deleteText = () => {
  $('.te-button').show()
  $('.te-form').hide()
  clearForm()
}

let exportImage = () => {
  let data = canvas.toDataURL('image/jpeg')
  let link = document.createElement('a')
  link.href = data
  link.download = $('#fileName').val() + ".jpg"
  link.click()
}

let newWP = () => {
  if (confirm('Эти обои не будут сохранены. Продолжить?')){
    ctx.fillStyle = $('#colorBack').val()
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    $('.te-button').show()
    $('.te-form').hide()
    backgroundPicture.src = canvas.toDataURL()
    clearForm()
  }
}

let saveImage = () => {
  let data = canvas.toDataURL('image/jpeg')
  let xhr = new XMLHttpRequest()
  let body = 'title=' + encodeURIComponent($('#fileName').val()) +
  '&content=' + encodeURIComponent(data)
  xhr.open("POST", '/create_wp', true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(body)
  alert('Обои сохранены')
}

setInterval(draw, 10)
