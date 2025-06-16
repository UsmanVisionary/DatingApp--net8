using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ITokenService
{
   string CreateToken(AppUser user);
}
