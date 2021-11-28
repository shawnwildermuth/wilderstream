using System.ComponentModel.DataAnnotations;

namespace Bookcase.Data;

public class CredentialsModel
{
  [Required]
  [EmailAddress]
  public string? UserName { get; set; }
  [Required]
  public string? Password { get; set; }
}