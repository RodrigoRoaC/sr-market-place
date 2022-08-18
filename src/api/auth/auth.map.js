const parseUserAuthResponse = (user) => ({
  cod_usuario: user.cod_usuario,
  nombres: user.nombres,
  username: user.username,
  cod_perfil: user.cod_perfil,
});

module.exports = {
  parseUserAuthResponse,
}
