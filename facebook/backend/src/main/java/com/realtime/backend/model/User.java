package com.realtime.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.realtime.backend.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private String profilePicture;
    private String coverPicture;
    private String description;
    private String country;
    private Integer relationship;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "to", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonManagedReference
    private List<Follower> followers;
    @OneToMany(mappedBy = "from", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonManagedReference
    private List<Following> followings;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonManagedReference
    private List<Post> posts;
    //Followers
    public void addFollower(Follower toFollow ) {
        this.followers.add(toFollow);
    }
    public void addFollowing( Following toFollowing) {
        this.followings.add(toFollowing);
    }
    public void removeFollower(Follower follower) {
      this.followers.remove(follower);
    }
    public void removeFollowing(Following following) {
      this.followings.remove(following);
    }
    //Posts
    public void addPost(Post post){
        this.posts.add(post);
    }
    //Component for JWT
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



}
