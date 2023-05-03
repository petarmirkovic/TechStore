using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Pera",
                    Email = "pera@test.com",
                    UserName = "perazdera",
                    Address = new Address
                    {
                        FirstName = "Pera",
                        LastName = "Zdera",
                        Street = "Sweethaven Village",
                        City = "Sweethaven Village",
                        State = "Malta",
                        Country = "Malta",
                        ZipCode = "00000"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}