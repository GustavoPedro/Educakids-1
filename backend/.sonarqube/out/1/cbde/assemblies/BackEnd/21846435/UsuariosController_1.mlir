// Skipping function GetUsuario(), it contains poisonous unsupported syntaxes

// Skipping function GetUsuario(none), it contains poisonous unsupported syntaxes

// Skipping function GetUsuarioNome(none), it contains poisonous unsupported syntaxes

// Skipping function PutUsuario(none), it contains poisonous unsupported syntaxes

// Skipping function getAlunos(), it contains poisonous unsupported syntaxes

// Skipping function getProfessores(), it contains poisonous unsupported syntaxes

// Skipping function PostUsuario(none), it contains poisonous unsupported syntaxes

func @_BackEnd.Controllers.UsuariosController.GetUserLogged$BackEnd.Models.Usuario$(none) -> none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :216 :8) {
^entry (%_usuario : none):
%0 = cbde.alloca none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :216 :37)
cbde.store %_usuario, %0 : memref<none> loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :216 :37)
br ^0

^0: // JumpBlock
// Skipped because MethodDeclarationSyntax or ClassDeclarationSyntax or NamespaceDeclarationSyntax: TokenService
%1 = cbde.unknown : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :218 :54) // Not a variable of known type: usuario
%2 = cbde.unknown : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :218 :27) // TokenService.GenerateToken(usuario) (InvocationExpression)
%4 = cbde.unknown : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :219 :12) // Not a variable of known type: usuario
%5 = cbde.unknown : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :219 :12) // usuario.Senha (SimpleMemberAccessExpression)
%6 = cbde.unknown : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :219 :28) // "" (StringLiteralExpression)
%7 = cbde.unknown : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :222 :26) // Not a variable of known type: usuario
%8 = cbde.unknown : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :223 :24) // Not a variable of known type: token
%9 = cbde.unknown : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :220 :19) // new              {                  Usuario = usuario,                  token = token              } (AnonymousObjectCreationExpression)
return %9 : none loc("C:\\Repositorio\\Backend\\Controllers\\UsuariosController.cs" :220 :12)

^1: // ExitBlock
cbde.unreachable

}
// Skipping function Login(none), it contains poisonous unsupported syntaxes

// Skipping function DeleteUsuario(none), it contains poisonous unsupported syntaxes

// Skipping function UsuarioExists(none, none), it contains poisonous unsupported syntaxes

// Skipping function UsuarioExists(none), it contains poisonous unsupported syntaxes

// Skipping function AlterarSenha(none, none), it contains poisonous unsupported syntaxes

