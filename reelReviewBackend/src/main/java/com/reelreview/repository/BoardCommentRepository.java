package com.reelreview.repository;

import com.reelreview.domain.board.BoardCommentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardCommentRepository extends JpaRepository<BoardCommentDTO, Integer> {
}
