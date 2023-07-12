package com.reelreview.Repo.Main;

import org.springframework.data.jpa.repository.JpaRepository;
import com.reelreview.domain.board.Board;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

}
