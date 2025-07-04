using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Data.Migrations;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
  [HttpPost("register")]  //account/register

  public async Task <ActionResult<UserDto>> Register(RegisterDto registerDto)
  {
      if(await UserExits(registerDto.UserName)) return BadRequest("Username is taken");

     return Ok();
     
      // using var hmac = new HMACSHA512();

      // var user = new AppUser
      // {
      //   UserName = registerDto.Username.ToLower(),
      //   PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
      //   PasswordSalt = hmac.Key
      // };

      // context.Users.Add(user);
      // await context.SaveChangesAsync();

      // return new UserDto
      // {
      //   Username = user.UserName,
      //   Token = tokenService .CreateToken(user)
      // };
  }

      [HttpPost("login")]   //accountLogin

    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
      {
           var user = await context.Users.FirstOrDefaultAsync(x => 
           x.UserName == loginDto.UserName.ToLower());

           if(user == null) return Unauthorized("Invalid username");

           using var hmac = new HMACSHA512(user.PasswordSalt);

           var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

             for (int i = 0; i < ComputeHash.Length; i++)
             {
                if(ComputeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");

             }

              return new UserDto
      {
        Username = user.UserName,
        Token = tokenService .CreateToken(user)
      };
      }

    
  private async Task<bool> UserExits(string username)
  {
    return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());


  }
}

